import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import PageHero from '@/components/PageHero'
import Section from '@/components/ui/Section'
import Picture from '@/components/ui/Picture'
import Button from '@/components/ui/Button'
import { projects } from '@/content/pages'

// Placeholder tiles (varied aspect ratios → masonry). Swap for real photos.
const projectTiles = [
  { label: '7 Brew — exterior', aspect: 'aspect-[4/3]' },
  { label: '7 Brew — storefront', aspect: 'aspect-[3/4]' },
  { label: 'Wonders of Wildlife', aspect: 'aspect-video' },
  { label: 'MSU Welcome Center', aspect: 'aspect-[4/3]' },
  { label: 'Joplin High School', aspect: 'aspect-[3/4]' },
  { label: 'Dumpster enclosure', aspect: 'aspect-square' },
  { label: 'Aerial site plan', aspect: 'aspect-[3/4]' },
  { label: 'Drive-thru build', aspect: 'aspect-[4/3]' },
]

export default function Projects() {
  return (
    <>
      <Seo {...seo.projects} />
      <PageHero title={projects.heading} eyebrow="Our work">
        {projects.intro}
      </PageHero>

      <Section className="bg-white">
        {/* Masonry gallery — placeholder tiles until real photos are added */}
        <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {projectTiles.map((tile) => (
            <Picture
              key={tile.label}
              label={tile.label}
              aspect={tile.aspect}
              className="break-inside-avoid"
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-slate-600">Have a project in mind?</p>
          <div className="mt-4">
            <Button to="/contact" size="lg">
              Start your project
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
