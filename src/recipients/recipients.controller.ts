import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Recipient } from './recipient.entity';
import { RecipientsService } from './recipients.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';

@Controller('api/recipients')
@Crud({
  model: { type: Recipient },
  dto: {
    create: CreateRecipientDto,
    update: UpdateRecipientDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
export class RecipientsController {
  constructor(private readonly service: RecipientsService) {}
}
