import React from 'react';
import FooterSection from './footer-section';
import {
  AboutUsSectionData,
  SiteMapSectionData,
  TermsSectionData
} from '../../constants/footer-section-data';

export default function Footer() {
  return (
    <footer>
      <FooterSection
        classStyles='flex flex-col p-2'
        heading={AboutUsSectionData.heading}
        paragraphArray={AboutUsSectionData.paragraphArray}
      />
      <FooterSection
        classStyles='flex flex-col flex-auto p-2'
        heading={SiteMapSectionData.heading}
        paragraphArray={SiteMapSectionData.paragraphArray}
      />
      <FooterSection
        classStyles='flex flex-col flex-auto p-2'
        heading={TermsSectionData.heading}
        paragraphArray={TermsSectionData.paragraphArray}
      />
    </footer>
  );
}
