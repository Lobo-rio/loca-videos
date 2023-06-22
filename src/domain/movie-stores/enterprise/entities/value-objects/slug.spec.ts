import { Slug } from './slug'

describe('Create From Text Slug', () => {
  it('should be able to create a new slug from text', () => {
    const slug = Slug.createFromtext('Example films title')

    expect(slug.value).toEqual('example-films-title')
  })
})
