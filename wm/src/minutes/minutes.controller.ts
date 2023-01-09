import { Controller, Get, Delete, Put, Post, Param, HttpException, HttpStatus, Body } from '@nestjs/common';
import { MinutesService } from './minutes.service';
import { ApiTags } from '@nestjs/swagger';
import { Minutes } from './minutes.entity';
import { MinuteInput } from './minutes.input';


@ApiTags('Minutes')
@Controller('minutes')
export class MinutesController {
    constructor(private service: MinutesService){}

    @ApiTags('Get')
    @Get()
    getAll(): Promise<Minutes[]>{   
        return this.service.getAll();;
    }

    @ApiTags('Get')
    @Get(':id')
    async getById(@Param() parametre): Promise<Minutes>{ 
        let minutes = await this.service.getById(parametre.id)
        if(minutes  === undefined || minutes === null){
            throw new HttpException('Could not find a association with the id ${parametre.id}', 404);
        }
        return minutes;
    }

    @ApiTags('Création')
    @Post()
    create(@Body() input: MinuteInput): Promise<Minutes> {
        return this.service.create(input.content,input.idVoters,input.date,input.idAssocation);
    }

    @ApiTags('Mise à jour')
    @Put(':id')
    getMAJ(@Param() parametre, @Body() input: any): Promise<Minutes>{
        let assoMAJ = this.service.getById(parametre.id);
        if(assoMAJ === undefined){
        throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
        }
        return this.service.getMaj(parametre.id,input.content,input.date,input.idUsers,input.idAsso);
    }

    @ApiTags('Delete')
    @Delete(':id')
    suppr(@Param() parametre): Promise<Minutes[]>{
        let assoDelete = this.service.getById(parametre.id);
        if(assoDelete === undefined){
        throw new HttpException('Could not find a association with the id ${parametre.id}', HttpStatus.NOT_FOUND);
        }
        return this.service.delete(parametre.id);
    }
}


