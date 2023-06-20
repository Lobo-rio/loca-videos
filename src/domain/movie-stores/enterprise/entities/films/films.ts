import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from '../value-objects/slug'

interface FilmsProps {
  title: string
  slug: Slug
  description: string
  launch: Date
  boxOffice: number
  indications: string
  basedOn: string
  createdAt: Date
  updatedAt?: Date
}

export class Films extends Entity<FilmsProps> {
  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get description() {
    return this.props.description
  }

  get excerpt() {
    return this.description.substring(0, 80).trimEnd().concat('...')
  }

  get launch() {
    return this.props.launch
  }

  get boxOffice() {
    return this.props.boxOffice
  }

  get indications() {
    return this.props.indications
  }

  get basedOn() {
    return this.props.basedOn
  }

  set launch(launch: Date) {
    this.props.launch = launch
    this.touch()
  }

  set boxOffice(boxOffice: number) {
    this.props.boxOffice = boxOffice
    this.touch()
  }

  set indications(indications: string) {
    this.props.indications = indications
    this.touch()
  }

  set basedOn(basedOn: string) {
    this.props.basedOn = basedOn
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<FilmsProps, 'createdAt'>, id?: UniqueEntityID) {
    const film = new Films(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return film
  }
}
