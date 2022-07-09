import { Exclude } from "class-transformer";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(() => Role, (role) => role.id)
    role: Role;

    @Column({ unique: true })
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ nullable: true })
    profileImage: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    fcmToken: string;

    @Column({ default: "0", unique: true })
    phoneNumber: string;

    @Column({ default: 0 })
    tokenVersion: number;

    @Column({ type: "timestamp", nullable: true })
    last_updated: Date;

    @Column({ type: "timestamp" })
    timestamp: Date;
}
