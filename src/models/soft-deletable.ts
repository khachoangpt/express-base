import { Column } from 'typeorm'

import { BaseModel } from './base'

export class SoftDeletableModel extends BaseModel {
  @Column({ type: 'timestamptz', nullable: false })
  deleted_at: Date
}
