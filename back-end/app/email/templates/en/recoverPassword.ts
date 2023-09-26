function recoverPasswordEn (data: any) {
  return `
    <img src="${data.baseUrl}/public/img/unlock.png" alt="Unlock" style="height: 200px;margin: 3em auto 0 auto;display: flex;">

    <h1 style="margin-bottom: 0;text-align: center;">FORGOT YOUR</h1>
    <h1 style="margin-top: 0;text-align: center;">PASSWORD?</h1>

    <p>
      <span style="display: block;margin: auto;color: #666666;font-size: 16px;text-align: center;">Hi ${data.firstName} ${data.lastName}</span>
      <span style="display: block;margin: auto;color: #666666;font-size: 16px;text-align: center;">There was a request to change your password!</span>
    </p>
    <p>
      <span style="display: block;margin: auto;color: #666666;font-size: 16px;text-align: center;">If did not make this request, just ignore this email.</span>
      <span style="display: block;margin: auto;color: #666666;font-size: 16px;text-align: center;">Otherwise, please click the button below to change your password:</span>
    </p>

    <a href="${data.href}" target="_blank" style="text-decoration: none;cursor: pointer;">
      <button style="display: -webkit-inline-box; display: -webkit-inline-flex; display: -ms-inline-flexbox; display: inline-flex; -webkit-align-items: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -ms-flex-pack: center; -webkit-justify-content: center; justify-content: center; position: relative; box-sizing: border-box; -webkit-tap-highlight-color: transparent; outline: 0; border: 0; margin: 0; border-radius: 0; padding: 0; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; vertical-align: middle; -moz-appearance: none; -webkit-appearance: none; -webkit-text-decoration: none; text-decoration: none; color: inherit; font-family: 'Roboto','Helvetica','Arial',sans-serif; font-weight: 500; font-size: 0.9375rem; line-height: 1.75; letter-spacing: 0.02857em; text-transform: uppercase; min-width: 64px; padding: 8px 22px; border-radius: 4px; -webkit-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; color: #fff; background-color: #1976d2; box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12); margin: 0 auto 3em auto;display: flex;">
        Reset password
      </button>
    </a>
  `;
}

module.exports = recoverPasswordEn;
