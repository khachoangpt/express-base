import { Column } from 'typeorm'

export class BaseModel {
  @Column({ type: 'varchar', nullable: false })
  id: string

  @Column({ type: 'timestamptz', nullable: false })
  created_at: Date

  @Column({ type: 'timestamptz', nullable: false })
  updated_at: Date
}
