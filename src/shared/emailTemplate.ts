import config from '../config';
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
                <img src="https://res.cloudinary.com/dkbcx9amc/image/upload/v1757074657/Group_1000007672_oxlc75.png" alt="Logo" width="120" style="display:block; margin:0 auto;">
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


const fileSentTemplate = (values:{name:string,file:string,email:string}) => {

  const fileLink = `${config.url.base_url}/api/v1/order${values.file}`

  return {
    to: values.email,
    subject: 'Your Template is Ready',
    html: `  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f8f9fa;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" 
      style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
      
      <!-- Logo -->
      <tr>
        <td align="center" style="padding: 20px;">
          <img src="https://res.cloudinary.com/dkbcx9amc/image/upload/v1757074657/Group_1000007672_oxlc75.png" alt="Ready Verified" width="180" style="display:block;">
        </td>
      </tr>

      <!-- Title -->
      <tr>
        <td align="center" style="padding: 0 20px;">
          <h2 style="color:#004080; margin:0;">Thank You for Your Purchase!</h2>
        </td>
      </tr>

      <!-- Message -->
      <tr>
        <td style="padding: 20px;">
          <p style="font-size:16px; color:#555555; margin:0 0 15px 0;">
            Hi ${values.name},
          </p>
          <p style="font-size:16px; color:#555555; margin:0 0 15px 0;">
            Thank you for purchasing from <strong style="color:#2E9C45;">Ready Verified</strong>.  
            Your digital file is ready for download. Please use the button below:
          </p>

          <!-- Download Button -->
          <p style="text-align:center; margin:30px 0;">
            <a href="${fileLink}" 
              style="display:inline-block; background:#0066CC; color:#ffffff; text-decoration:none; 
              padding:12px 20px; border-radius:6px; font-weight:bold;" download>
              Download Your File
            </a>
          </p>

          <!-- Backup Link -->
          <p style="font-size:14px; color:#555555; margin:0 0 15px 0;">
            If the button does not work, copy and paste this link into your browser:<br>
            <a href="${fileLink}" style="color:#0066CC;" download>${fileLink}</a>
          </p>

          <!-- Support -->
          <p style="font-size:14px; color:#555555; margin:0;">
            If you have any questions, just reply to this email.  
            We’re always happy to help!
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding: 20px; font-size:13px; color:#888888; background:#f1f1f1; border-radius: 0 0 8px 8px;">
          &copy; 2025 <span style="color:#2E9C45;">Ready Verified</span>. All rights reserved.
        </td>
      </tr>
    </table>
  </body>`
  }
  
}

export const emailTemplate = {
  createAccount,
  resetPassword,
zoomLinkTemplate,
fileSentTemplate
};
