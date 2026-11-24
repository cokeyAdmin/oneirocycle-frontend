// GlassButton's neutral surface gradient and conic rim on the moving water shape.
export const polishedGlassMaterial = `
 vec2 local=p-glassCenter;
 vec2 axis=vec2(-.965926,-.258819);
 float travel=max(dot(abs(axis),glassHalf),1.);
 float along=clamp(.5+.5*dot(local,axis)/travel,0.,1.);
 float face=mix(.05,.20,1.-abs(along*2.-1.));
 float base=mix(1.,.08,uDark),ink=1.-base;
 float da=dm*face;vec3 dc=vec3(base*da);

 // Match the two opposing highlights of the reference's -75 degree conic rim.
 float turn=fract((atan(local.x,-local.y)+1.308997)/6.283185);
 float shine=max(1.-smoothstep(0.,.05,min(turn,1.-turn)),
   smoothstep(.40,.50,turn)*(1.-smoothstep(.50,.60,turn)));
 float rim=dm*(1.-smoothstep(.2,1.4,abs(dd+.7)));
 float la=rim*.26;
 dc=vec3(base*la)+dc*(1.-la);da=la+da*(1.-la);
 la=rim*shine*.5;
 dc=vec3(ink*la)+dc*(1.-la);da=la+da*(1.-la);

 // Keep the existing water normals visible without adding a colored rim.
 la=dm*clamp(spec*.25+spec2*.22+smoothstep(.6,1.,cs)*.09*th,0.,1.);
 dc=vec3(la)+dc*(1.-la);da=la+da*(1.-la);
`;
