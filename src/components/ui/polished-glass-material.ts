// Rounded glass surface and inset highlights drawn on the animated silhouette.
export const polishedGlassMaterial = `
 float height=clamp(.5+(p.y-glassCenterY)/max(glassHalfHeight*2.,1.),0.,1.);
 float topGlow=1.-smoothstep(0.,.58,height);
 float edge=1.-smoothstep(.5,1.7,abs(dd+.7));
 float bevel=1.-smoothstep(.8,3.3,abs(dd+2.));
 float da=dm*(.045+.13*topGlow);vec3 dc=vec3(.94,.97,1.)*da;
 float la=dm*smoothstep(.52,1.,height)*.09;
 dc*=1.-la;da=la+da*(1.-la);
 la=dm*(edge*(.22+.22*topGlow)+bevel*.08);
 dc=vec3(la)+dc*(1.-la);da=la+da*(1.-la);
 la=dm*clamp(spec*.48+spec2*.35+smoothstep(.6,1.,cs)*.16*th,0.,1.);
 dc=vec3(la)+dc*(1.-la);da=la+da*(1.-la);
`;
