import { MessageTypesEnum } from '../enum/message-types.enum';

export class SendMessageDto {
  type: MessageTypesEnum;
  payload: any;
}
