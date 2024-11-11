import {Canvas} from "@react-three/fiber";
import {
    XR,
    createXRStore,
    XRHandModel,
    XRSpace,
    XRHitTest,
    useXRInputSourceStateContext,
    XRControllerModel, XROrigin
} from "@react-three/xr";
import ModelsStart from "../ModelsStart/index";
import {Suspense} from "react";



const store = createXRStore({
    controller: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const state = useXRInputSourceStateContext()
        return (
            <>
                <XRControllerModel />
                <XRHitTest
                    space={state.inputSource.targetRaySpace}
                />
            </>
        )
    },

})

const ModelContainer = () => {
    console.log('store.getState().session', store.getState())

    return (
        <>
            <button className={'btn'} onClick={() => store.enterAR()}>
                <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line"/>
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line"/>
                </svg>
                Вход AR
            </button>
            {/*<button className={'btn'} onClick={() => store.getState().session?.end()}>*/}
            {/*    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">*/}
            {/*        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line"/>*/}
            {/*        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line"/>*/}
            {/*    </svg>*/}
            {/*    Выход AR*/}
            {/*</button>*/}
            <Canvas shadows camera={{position: [1, 1, 1], zoom: 1.9}}>
                <XR store={store}>
                    <XROrigin />
                    <Suspense fallback={null}>
                        <directionalLight position={[-1, 20, 30]}/>
                        <ambientLight/>
                        <color attach={"background"} args={["lightgreen"]}/>
                        <ModelsStart/>
                    </Suspense>
                </XR>
            </Canvas>
        </>
    );
};

export default ModelContainer;
