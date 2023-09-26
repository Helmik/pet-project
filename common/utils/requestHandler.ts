import { ResponseAnyInterface } from '../interfaces/Response.interface';

const RequestHandler = function (promise: Promise<any>): Promise<ResponseAnyInterface> {
  return new Promise(resolve => {
    promise
      .then(d => {
        let data = d;
        if (d && d.data && d.data.data && d.data.data.data) {
          data = d.data.data;
        } if (d && d.data && d.data.data) {
          data = d.data;
        }
        let success = data && data.success ?  data.success : undefined;
        data = data && data.data ? data.data : data;
        resolve({ data, success });
      }).catch(e => {
        let error = e.response ? e.response : e;
        
        if (error.data) {
          error = error.data;
        }
        if (error.error) {
          error = error.error;
        }
        resolve({ error });
      });
  });
}

export default RequestHandler;
