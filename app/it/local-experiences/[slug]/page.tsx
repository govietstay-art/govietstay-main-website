import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocalExperienceDraftPage, { buildExperienceMetadata } from '../../../../components/LocalExperienceDraftPage';
import { experienceSlugs, getExperience } from '../../../../lib/localExperienceDrafts';
import DaNangSignaturePage, {signatureMetadata} from '../../../../components/DaNangSignaturePage';
import {signatureSlugs,findSignature} from '../../../../lib/daNangSignatureExperiences';

export const dynamicParams=false;
export function generateStaticParams(){return [...experienceSlugs,...signatureSlugs].map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const signature=findSignature(slug);
 if(signature)return signatureMetadata('it',signature);
 return buildExperienceMetadata('it',slug);
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const signature=findSignature(slug);
 if(signature)return <DaNangSignaturePage locale="it" experience={signature}/>;
 const draft=getExperience(slug);
 if(!draft)notFound();
 return <LocalExperienceDraftPage locale="it" experience={draft}/>;
}
