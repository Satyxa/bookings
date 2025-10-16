import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.model";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        protected UserRepository: Repository<User>,
    ) {}

    async createUser(payload: User) {
        return await this.UserRepository.save(payload);
    }
}