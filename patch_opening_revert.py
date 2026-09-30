import re

with open('/home/gladwin/Documents/Personal/azure-deployments-talk/lib/presentation/openingSlides.ts', 'r') as f:
    content = f.read()

old_block = """  {
    id: 'opening-title',
    title: 'Azure Deployments Unlocked',
    section: 'Introduction',
    type: 'statement',
    statement: 'Deployments Unlocked',
    subtitle: 'Mastering the Azure Cloud Spectrum — from raw Virtual Machines to Managed Serverless',
    logos: [
      { src: '/assets/azug.jpg', alt: 'AZUG Philippines', className: 'rounded-md' },
      { src: '/assets/jugph.png', alt: 'JUG Philippines' }
    ],
    speakerNotes: ["""

new_block = """  {
    id: 'opening-title',
    title: 'Still on localhost:8080? Not Anymore!',
    section: 'Introduction',
    type: 'statement',
    statement: 'Still on localhost:8080? Not Anymore!',
    subtitle: 'Exploring Modern Deployment Methodologies with Microsoft Azure',
    logos: [
      { src: '/assets/azug.jpg', alt: 'AZUG Philippines', className: 'rounded-md' },
      { src: '/assets/jugph.png', alt: 'JUG Philippines' }
    ],
    speakerNotes: ["""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('/home/gladwin/Documents/Personal/azure-deployments-talk/lib/presentation/openingSlides.ts', 'w') as f:
        f.write(content)
    print("Reverted title text in openingSlides.ts")
else:
    print("Could not find block to replace.")
