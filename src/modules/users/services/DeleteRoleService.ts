import { Inject, Injectable } from '@nestjs/common';
import IRolesRepository from '../repositories/IRolesRepository';

@Injectable()
export default class DeleteRoleService {
	private rolesRepository: IRolesRepository;

	public constructor(
		@Inject('RolesRepository')
		    rolesRepository: IRolesRepository,
	) {
	    this.rolesRepository = rolesRepository;
	}

	public async execute(id) {
	    await this.rolesRepository.remove(id);
	}
}
