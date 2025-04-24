import { Controller, Get, Query } from '@nestjs/common';

const RtcTokenBuilder = require('../../lib/RTCTokenBuilder').RtcTokenBuilder;
const RtcRole = require('../../lib/RTCTokenBuilder').Role;

@Controller('agora')
export class AgoraController {
  @Get('token')
  getToken(
    @Query('channel') channelName: string,
    @Query('uid') uid: string,
    @Query('role') role: 'publisher' | 'subscriber',
  ) {
    // Get the value of the environment variable AGORA_APP_ID. Make sure you set this variable to the App ID you obtained from Agora console.
    const appId =
      process.env.AGORA_APP_ID || 'a7968f8d8b4a4288890c8f32eea7b8c1';
    // Get the value of the environment variable AGORA_APP_CERTIFICATE. Make sure you set this variable to the App certificate you obtained from Agora console
    const appCertificate =
      process.env.AGORA_APP_CERTIFICATE || '02850485b5c44a83b7551412b2b9b039';
    // Token validity time in seconds
    const tokenExpirationInSecond = 3600;
    // The validity time of all permissions in seconds
    const privilegeExpirationInSecond = 3600;
    if (
      appId == undefined ||
      appId == '' ||
      appCertificate == undefined ||
      appCertificate == ''
    ) {
      console.log(
        'Need to set environment variable AGORA_APP_ID and AGORA_APP_CERTIFICATE',
      );
      process.exit(1);
    }
    // Generate Token
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      Number(uid),
      role === 'publisher' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER,
      tokenExpirationInSecond,
      privilegeExpirationInSecond,
    );
    console.log('Token with int uid:', token);

    return { token };
  }
}
