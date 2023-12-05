import { Column, Entity } from 'typeorm'

import { SoftDeletableModel } from '../soft-deletable'

@Entity({ name: 'customer' })
export default class Customer extends SoftDeletableModel {
  @Column({ type: 'varchar', nullable: false })
  first_name: string

  @Column({ type: 'varchar', nullable: true })
  middle_name: string

  @Column({ type: 'varchar', nullable: false })
  last_name: string
}
