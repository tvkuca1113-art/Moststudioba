"""Read-only HTTP verification of the live release; run after deployment."""
import concurrent.futures, json, pathlib, re, sys, time, urllib.request, xml.etree.ElementTree as ET
origin='https://moststudioba.com'
stage=sys.argv[1] if len(sys.argv)>1 else 'after'
out=pathlib.Path('qa/evidence/2026-09-18');out.mkdir(parents=True,exist_ok=True)
def get(url):
 start=time.perf_counter()
 with urllib.request.urlopen(url,timeout=45) as r:
  headers=dict(r.headers);first=time.perf_counter();body=r.read();end=time.perf_counter()
  return dict(url=url,final=r.url,status=r.status,ttfb_ms=round((first-start)*1000),total_ms=round((end-start)*1000),bytes=len(body),headers=headers,body=body.decode('utf8'))
def sample(route):
 rows=[]
 for i in range(3):
  try:
   data=get(origin+route);rows.append({k:data[k] for k in ['status','ttfb_ms','total_ms','bytes']})
  except Exception as e:rows.append(dict(error=str(e)))
 return route,rows
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: samples=dict(pool.map(sample,['/','/kontakt','/moststudiowebshop']))
(out/f'http-{stage}.json').write_text(json.dumps(dict(method='Three HTTPS GET requests per URL from same execution environment; connection establishment included, no browser rendering metrics.',results=samples),indent=2))
if stage=='before':sys.exit(0)
sitemap=get(origin+'/sitemap.xml');robots=get(origin+'/robots.txt')
xml=ET.fromstring(sitemap['body']);ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[e.text for e in xml.findall('s:url/s:loc',ns)]
assert len(urls)==24;assert '<lastmod>' not in sitemap['body'];assert 'Allow: /' in robots['body'];assert 'Disallow: /' not in robots['body']
def verify(url):
 d=get(url);html=d.pop('body');d.pop('headers')
 canonical=re.search(r'<link rel="canonical" href="([^"]+)"',html).group(1)
 assert canonical.rstrip('/')==url.rstrip('/'),(url,canonical)
 assert 'eExoCdIgROmTlK9gPPFqpIQpTvrDImDbRYYXujw_kz4' in html
 assert len(re.findall(r'<h1\b',html))==1,url
 assert not re.search(r'<meta name="robots" content="[^"]*noindex',html),url
 d['title']=re.search(r'<title>(.*?)</title>',html).group(1)
 d['canonical']=canonical;d['hreflang']=re.findall(r'<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"',html)
 assert len(d['hreflang'])==3,(url,d['hreflang'])
 return d
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: pages=list(pool.map(verify,urls))
class Redirects(urllib.request.HTTPRedirectHandler):
 def __init__(self):self.chain=[]
 def redirect_request(self,req,fp,code,msg,headers,newurl):
  self.chain.append(dict(status=code,source=req.full_url,target=newurl))
  return super().redirect_request(req,fp,code,msg,headers,newurl)
redirects=[]
for base in ['http://moststudioba.com','http://www.moststudioba.com','https://www.moststudioba.com','https://moststudioba.vercel.app']:
 handler=Redirects();source=base+'/usluge/izrada-web-stranica?qa=most-20260918'
 try:
  with urllib.request.build_opener(handler).open(source,timeout=45) as r:
   final=r.url;status=r.status
  redirects.append(dict(source=source,final=final,status=status,chain=handler.chain,pass_check=final==origin+'/usluge/izrada-web-stranica?qa=most-20260918'))
 except Exception as e:redirects.append(dict(source=source,error=str(e),chain=handler.chain))
for route in ['/demo/stolarija-hrast','/de/demo/ordinacija-lipa','/demo/meridijan-savjetovanje','/moststudiowebshop']:
 d=get(origin+route);assert re.search(r'<meta name="robots" content="[^"]*noindex',d['body'])
(out/'public-after.json').write_text(json.dumps(dict(pages=pages,sitemap_status=sitemap['status'],robots=robots['body'],redirects=redirects),indent=2,ensure_ascii=False))
print(json.dumps(dict(pages=len(pages),redirects=redirects),ensure_ascii=False))
