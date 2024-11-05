import {Html} from "@react-three/drei";
import {useThree} from "@react-three/fiber";

const CustomARButton = () => {
    const {gl} = useThree();

    const handleClick = async () => {
        if (gl.xr.isPresenting) {
            await gl.xr.getSession().end();
        } else {
            if (navigator.xr && navigator.xr.isSessionSupported) {
                const supported = await navigator.xr.isSessionSupported('immersive-ar');
                if (supported) {
                    try {
                        const session = await navigator.xr.requestSession('immersive-ar', {
                            requiredFeatures: ['local-floor'],
                            optionalFeatures: ['bounded-floor']
                        });
                        gl.xr.setSession(session);
                    } catch (error) {
                        console.error('Не удалось запустить AR-сессию:', error);
                        alert('Ваше устройство не поддерживает необходимый функционал для AR.');
                    }
                } else {
                    console.error('AR не поддерживается на этом устройстве');
                    alert('AR не поддерживается на этом устройстве');
                }
            } else {
                console.error('WebXR не поддерживается вашим браузером');
                alert('WebXR не поддерживается вашим браузером');
            }
        }
    };

    return (
        <Html style={{
            bottom: '-65px',
            position: 'fixed',
            right: '-541px',
            height: '100vh',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <button className="btn" onClick={handleClick}>
                <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line"/>
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line"/>
                </svg>
                <span>{gl.xr.isPresenting ? 'Выйти из AR' : 'Войти в AR'}</span>
            </button>
        </Html>
    );
}

export default CustomARButton;