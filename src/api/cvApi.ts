import type { CV } from "@/types/CV"; 
import cv from "@cv";

let dataCV: CV = cv;

// Se mantiene función para compatibilidad con api de AWS 'https://richardhapb.s3.us-east-2.amazonaws.com/resources/cv.json'
export async function fetchCV(): Promise<CV> {
  if (!dataCV.basics || Object.keys(dataCV.basics).length === 0) {
    dataCV = cv;
  }
  return dataCV
}
