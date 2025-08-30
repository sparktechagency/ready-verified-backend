import { ICreateAccount, IResetPassword } from '../types/emailTamplate';

const createAccount = (values: ICreateAccount) => {
  const data = {
    to: values.email,
    subject: 'Verify your account',
    html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://i.postimg.cc/6pgNvKhD/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
          <h2 style="color: #277E16; font-size: 24px; margin-bottom: 20px;">Hey! ${values.name}, Your Toothlens Account Credentials</h2>
        <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
            <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
        </div>
    </div>
</body>`,
  };
  return data;
};

const resetPassword = (values: IResetPassword) => {
  const data = {
    to: values.email,
    subject: 'Reset your password',
    html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://i.postimg.cc/6pgNvKhD/logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
        <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
            <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
                <p style="color: #b9b4b4; font-size: 16px; line-height: 1.5; margin-bottom: 20px;text-align:left">If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.</p>
        </div>
    </div>
</body>`,
  };
  return data;
};


const zoomLinkTemplate = (values: {name:string,email:string,zoomLink:string}) => {
  const data = {
    to: values.email,
    subject: 'Zoom Link',
    html: `  <body style="margin:0; padding:0; background-color:#f4f7fa; font-family: Arial, sans-serif; color:#333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7fa; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#1E88E5; padding:20px; text-align:center;">
                <img src="https://yourdomain.com/logo.png" alt="Logo" width="120" style="display:block; margin:0 auto;">
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td style="padding:30px 40px;">
                <h2 style="margin:0; color:#1E88E5; font-size:22px; text-align:center;">Assessment Interview Invitation</h2>
                
                <p style="font-size:16px; margin:25px 0 10px;">Hi <strong>${values.name}</strong>,</p>
                <p style="font-size:15px; line-height:1.6; margin:0 0 20px;">
                  Congratulations 🎉  
                  We are pleased to invite you to your upcoming <strong>assessment interview</strong>.
                </p>
                
                <div style="text-align:center; margin:30px 0;">
                  <a href="${values.zoomLink}" 
                     style="background-color:#43A047; color:#fff; text-decoration:none; font-size:16px; padding:14px 28px; border-radius:8px; display:inline-block; font-weight:bold;">
                     Join Interview
                  </a>
                </div>
                
                <p style="font-size:14px; color:#555; margin-top:20px;">
                  Please make sure you are available at the scheduled time and have a stable internet connection.  
                  If you face any issues, feel free to contact us.
                </p>
                
                <p style="font-size:14px; margin-top:20px;">Best regards, <br>
                  <strong>The ReadyVerified Team</strong></p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color:#f0f4f9; padding:20px; text-align:center; font-size:13px; color:#888;">
                <p style="margin:0;">&copy; 2025 ReadyVerified. All rights reserved.</p>
                <p style="margin:5px 0 0;">
                  <a href="https://yourwebsite.com" style="color:#1E88E5; text-decoration:none;">Visit our website</a>
                </p>
              </td>
            </tr>
            
          </table>
        </td>
      </tr>
    </table>
  </body>`,
  };
  return data;
}

export const emailTemplate = {
  createAccount,
  resetPassword,
zoomLinkTemplate
};
