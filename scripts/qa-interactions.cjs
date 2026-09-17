/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS loader hooks isolate TSX components for DOM regression tests. */
const path=require('node:path'),fs=require('node:fs'),Module=require('node:module'),assert=require('node:assert/strict');
const base=path.resolve(__dirname,'..');
const ts=require(base+'/node_modules/typescript');
const originalResolve=Module._resolveFilename,originalLoad=Module._load;
Module._resolveFilename=function(request,parent,...rest){
 if(request==='react'||request.startsWith('react/')||request==='react-dom'||request.startsWith('react-dom/'))return originalResolve.call(this,path.join(base,'node_modules',request),parent,...rest);
 if(request.startsWith('@/'))request=path.join(base,'src',request.slice(2));
 return originalResolve.call(this,request,parent,...rest);
};
const React=require(base+'/node_modules/react');
Module._load=function(request,parent,isMain){if(request==='next/link')return ({children,...props})=>React.createElement('a',props,children);if(request==='next/navigation')return {usePathname:()=>'/'};if(request==='next/image')return props=>React.createElement('img',{alt:props.alt,src:props.src});return originalLoad.call(this,request,parent,isMain);};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=(m)=>{m.exports={__esModule:true,default:new Proxy({},{get:(_,key)=>String(key)})};};
const {JSDOM}=require('jsdom');const dom=new JSDOM('<!doctype html><html><body></body></html>',{url:'http://localhost/'});
for(const key of ['window','document','HTMLElement','HTMLAnchorElement','HTMLInputElement','Node','MutationObserver','getComputedStyle'])global[key]=key==='getComputedStyle'?dom.window.getComputedStyle.bind(dom.window):dom.window[key];
Object.defineProperty(global,'navigator',{value:dom.window.navigator,configurable:true});
global.IS_REACT_ACT_ENVIRONMENT=true;
const downloads=[];global.URL.createObjectURL=()=> 'blob:demo';global.URL.revokeObjectURL=()=>{};dom.window.HTMLAnchorElement.prototype.click=function(){downloads.push(this.download);};
const {render,screen,cleanup,within}=require('@testing-library/react');const userEvent=require('@testing-library/user-event').default;
const {Header}=require(base+'/src/components/layout/Header.tsx');
const {getDictionary}=require(base+'/src/lib/i18n/dictionary.ts');
window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
const {FurnitureConfigurator,AppointmentBooking,AdvisoryPlanner}=require(base+'/src/components/demos/DemoTools.tsx');
async function run(){
 const {bookingDateLabel}=require(base+'/src/lib/demo-logic.ts');
 assert.equal(bookingDateLabel('2026-09-18','bs'),'petak, 18. septembar');
 assert.equal(bookingDateLabel('2026-09-18','de'),'Freitag, 18. September');
 const user=userEvent.setup();
 const main=document.createElement('main');main.inert=false;document.body.appendChild(main);
 Object.defineProperty(window,'scrollY',{value:1800,configurable:true});
 render(React.createElement(Header,{locale:'bs',route:{key:'home'},dict:getDictionary('bs'),tone:'overlay'}));
 for (let repeat=0;repeat<3;repeat++) {
  await user.click(screen.getByRole('button',{name:'Otvori meni'}));
  const panel=document.getElementById('mobile-menu');
  assert.equal(panel.hidden,false);assert.equal(document.querySelector('header').contains(panel),false,'Overlay must be outside blurred header');
  assert.equal(main.inert,true);assert.equal(document.documentElement.style.overflow,'hidden');
  assert.equal(within(panel).getByRole('link',{name:'Usluge',exact:true}).getAttribute('href'),'/usluge');
  assert.equal(within(panel).getByRole('link',{name:'Kako radimo',exact:true}).getAttribute('href'),'/#proces');
  await user.keyboard('{Escape}');
  assert.equal(panel.hidden,true);assert.equal(main.inert,false);assert.equal(document.documentElement.style.overflow,'');
  assert.equal(document.activeElement,screen.getByRole('button',{name:'Otvori meni'}));
 }
 cleanup();main.remove();

 render(React.createElement(FurnitureConfigurator,{locale:'bs'}));
 for (const [name,slug] of [['Kuhinja','kuhinja'],['Plakar','plakar'],['Trpezarijski sto','sto']]) {
  await user.click(screen.getByRole('button',{name}));
  const observed=[];
  for (const finish of ['Hrast, uljeni','Orah, mat lak','Mat bijela']) {
   await user.click(screen.getByRole('button',{name:finish}));
   const photos=screen.getAllByAltText(name+' — '+finish);
   assert.equal(photos.length,2); assert(photos.every(p=>p.src.includes('hrast-'+slug)));
   observed.push(photos[0].src);
  }
  assert.equal(new Set(observed).size,3, 'Every finish needs a distinct room image');
 }
 await user.click(screen.getByRole('button',{name:'Trpezarijski sto'}));assert.equal(screen.getByRole('slider').value,'280');
 await user.click(screen.getByRole('button',{name:'Mat bijela'}));assert.equal(screen.getByRole('button',{name:'Mat bijela'}).getAttribute('aria-pressed'),'true');
 await user.click(screen.getByRole('checkbox',{name:'Dostava i montaža'}));assert.equal(screen.getByRole('checkbox',{name:'Dostava i montaža'}).checked,false);
 await user.click(screen.getByRole('button',{name:'Preuzmi svoj projekt'}));assert.equal(downloads.at(-1),'MOST-Hrast-projekt.txt');assert.match(screen.getByRole('status').textContent,/pripremljen/);cleanup();
 render(React.createElement(AppointmentBooking,{locale:'bs'}));
 await user.click(screen.getByRole('button',{name:'Odaberite datum'}));
 assert.equal(screen.getByRole('button',{name:'Pregled odabira'}).disabled,true);
 assert(screen.getAllByRole('button',{name:/^\d\d:\d\d$/}).some(b=>b.disabled));
 await user.click(screen.getAllByRole('button',{name:/^\d\d:\d\d$/}).find(b=>!b.disabled));await user.click(screen.getByRole('button',{name:'Pregled odabira'}));
 assert.equal(screen.getByRole('textbox',{name:'Email za probu'}).value,'demo@example.com');
 await user.click(screen.getByRole('button',{name:'Izmijeni'}));await user.click(screen.getByRole('button',{name:'Nazad'}));
 await user.click(screen.getByRole('button',{name:/Profesionalno čišćenje/}));await user.click(screen.getByRole('button',{name:'Odaberite datum'}));
 assert.equal(screen.getByRole('button',{name:'Pregled odabira'}).disabled,true);assert(screen.getAllByRole('button',{name:/^\d\d:\d\d$/}).some(b=>b.disabled));
 await user.click(screen.getAllByRole('button',{name:/^\d\d:\d\d$/}).find(b=>!b.disabled));await user.click(screen.getByRole('button',{name:'Pregled odabira'}));
 await user.click(screen.getByRole('button',{name:'Potvrdi probni termin'}));assert(screen.getByRole('heading',{name:'Ovako izgleda potvrda.'}));
 assert.equal(document.activeElement.textContent,'Ovako izgleda potvrda.');
 assert.match(document.body.textContent,/Nije rezervisan stvarni termin/);
 await user.click(screen.getByRole('button',{name:'Isprobaj ponovo'}));assert.equal(screen.getByRole('button',{name:/Prvi pregled/}).getAttribute('aria-pressed'),'true');cleanup();
 render(React.createElement(AdvisoryPlanner,{locale:'bs'}));
 assert.equal(screen.getByRole('button',{name:'Dalje'}).disabled,true);
 for(let step=0;step<3;step++){
  const options=document.querySelectorAll('button[aria-pressed]');await user.click(options[step===0?0:2]);
  await user.click(screen.getByRole('button',{name:step===2?'Pogledaj moj plan':'Dalje'}));
 }
 assert(screen.getByRole('heading',{name:'Ponuda i novi klijenti'}));
 await user.click(screen.getByRole('button',{name:'6 sedmica'}));await user.click(screen.getByRole('button',{name:'Preuzmi plan'}));assert.equal(downloads.at(-1),'MOST-Meridijan-plan.txt');
 await user.click(screen.getByRole('button',{name:'Izmijeni odgovore'}));assert.equal(screen.getByRole('button',{name:/Promet raste/}).getAttribute('aria-pressed'),'true');
 await user.click(screen.getByRole('button',{name:'Počni ispočetka'}));assert.equal(screen.getByRole('button',{name:'Dalje'}).disabled,true);cleanup();
 render(React.createElement(AppointmentBooking,{locale:'de'}));await user.click(screen.getByRole('button',{name:'Weiter zum Termin'}));assert.equal(screen.getAllByRole('button',{name:/\d\d:\d\d/}).length,6);cleanup();
 console.log('PASS: repeated menu opening after scroll, viewport overlay ownership, focus and background cleanup; 9 furniture images; furniture selections/clamping/export; full booking, blocked slots, back/edit, service invalidation, confirmation, focus and reset; advisory step validation, majority plan, export, retained edits and reset; German controls.');
}
run().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>dom.window.close());
