import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionsCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

export class ConnectionsService {
  private connectionsRepository: Repository<Connection>

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionsCreate) {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connections = await this.connectionsRepository.findOne({
      user_id
    });
    return connections;
  }
  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"]
    });

    return connections;
  }
} 