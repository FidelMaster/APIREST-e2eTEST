import './common/config/env'
import { App } from './common/app';

const main = async () => {
    const app= new App();
    app.listen(process.env.PORT as string,()=>{
        console.log('server is listening on port '+process.env.PORT);
    })
    
}


main();