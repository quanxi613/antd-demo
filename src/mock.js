import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default {
    doMock() {
        let mock = new MockAdapter(axios);

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success',
            status: 1
        });
    }
}