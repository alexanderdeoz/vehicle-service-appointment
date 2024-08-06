import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from '@v1/shared/enum';

export const PublicRoute = () =>
  SetMetadata(MetadataKey.IS_PUBLIC_ROUTE_KEY, true);
