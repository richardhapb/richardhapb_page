import cv_en from '@cv_en'
import cv_es from '@cv_es'

type CV = typeof cv_en

let dataCV: CV = { basics: {} } as CV

export async function fetchCV(lang: string = 'en'): Promise<CV> {
    switch (lang) {
        case 'es':
            dataCV = cv_es
            break
        default:
            dataCV = cv_en
    }
    return dataCV
}
