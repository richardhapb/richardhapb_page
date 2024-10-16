// apicv.ts

import type { CV } from "@/types/CV"; 

let dataCV: CV = {
  basics: {name: "",
    label: "",
    description: "",
    image: "",
    email: "",
    phone: "",
    url: "",
    qrurl: "",
    summary: "",
    location: {
      address: "",
      postalCode: "",
      city: "",
      countryCode: "",
      region: ""},
    profiles: []
    },
  work: [],
  education: [],
  certificates: [],
  publications: [],
  skills: [],
  languages: [],
  interests: [],
  references: [],
  projects: [],
  softskills: [],
  hardskills: []
};

export async function fetchCV(): Promise<CV> {
  if (!dataCV.basics || Object.keys(dataCV.basics).length === 0) {
    const response = await fetch('https://richardhapb.s3.us-east-2.amazonaws.com/resources/cv.json');
    const data = await response.json();
    dataCV = data
  }
  return dataCV;
}
