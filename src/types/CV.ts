
export interface CV {
    basics: basics;
    work: work[];
    education: education[];
    certificates: certificate[];
    publications: publication[];
    skills: skill[];
    languages: language[];
    interests: interest[];
    references: reference[];
    projects: project[];
    softskills: string[];
    hardskills: string[];
}

interface profile {
    network: string;
    username: string;
    url: string;
    shorturl: string;
}

interface work {
    name: string;
    position: string;
    url: string;
    startDate: string;
    endDate: string;
    technologies: string[],
    summary: string;
    highlights: string[];
}

interface education {
    institution: string;
    title: string;
    url: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
}

interface basics {
    name: string;
    label: string;
    description: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    qrurl: string;
    summary: string;
    location: location;
    profiles: profile[];
}

interface location {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
}

interface certificate {
    name: string;
    date: string;
    issuer: string;
    url: string;
}

interface publication {
    name: string;
    publisher: string;
    releaseDate: string;
    url: string;
    summary: string;
}

interface skill {
    name: string;
    level: string;
    keywords: string[];
}

interface language {
    language: string;
    fluency: string;
}

interface interest {
    name: string;
    keywords: string[];
}

interface reference {
    name: string;
    reference: string;
    phone: string;
}

interface project {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    image: string;
    qrImage: string;
    highlights: string[];
    technologies: string[];
    url: string;
}
