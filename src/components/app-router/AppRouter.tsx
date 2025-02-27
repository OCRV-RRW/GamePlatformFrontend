import { BrowserRouter, Route, Routes } from "react-router";
import { ADMIN_PANEL_PATH, FORGOT_PASSWORD_PATH, GAME_PATH, GAMES_LIST_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH, REGISTER_VERIFY_EMAIL_PATH, RESET_PASSWORD_PATH, UPDATE_GAME_PATH, UPDATE_SKILL_PATH, UPDATE_USER_PATH } from "../../constants/BrowserPathes";
import CheckAuth from "../check-auth/CheckAuth";
import Path from "../page/Page";
import CheckNotAuth from "../check-auth/CheckNotAuth";
import { ROUTER_BASENAME } from "../../constants/Settings";
import CheckIsAdmin from "../check-auth/CheckIsAdmin";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { set_status } from "../../reducers/PageSlice";

function DefaultAppRouterPage() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(set_status('404'))
    }, [])

    return <></>
}

export default function AppRouter() {
    return (
        <>
            <BrowserRouter basename={ROUTER_BASENAME}>
                <Routes>
                    <Route path={HOME_PATH} element={
                        <CheckAuth>
                            <Path path={HOME_PATH} />
                        </CheckAuth>}
                    />
                    <Route path={LOGIN_PATH} element={
                        <CheckNotAuth>
                            <Path path={LOGIN_PATH} />
                        </CheckNotAuth>} 
                    />
                    <Route path={REGISTER_PATH} element={
                        <CheckNotAuth>
                            <Path path={REGISTER_PATH} />
                        </CheckNotAuth>} 
                    />
                    <Route path={REGISTER_VERIFY_EMAIL_PATH}>
                        <Route path=':id' element={
                            <CheckNotAuth>
                                <Path path={REGISTER_VERIFY_EMAIL_PATH} />
                            </CheckNotAuth>} 
                        />
                    </Route>
                    <Route path={RESET_PASSWORD_PATH}>
                        <Route path=':id' element={
                            <CheckNotAuth>
                                <Path path={RESET_PASSWORD_PATH} />
                            </CheckNotAuth>}
                        />
                    </Route>
                    <Route path={FORGOT_PASSWORD_PATH} element={
                        <CheckNotAuth>
                            <Path path={FORGOT_PASSWORD_PATH} />
                        </CheckNotAuth>} 
                    />
                    <Route path={GAME_PATH} element={
                        <CheckAuth>
                            <Path path={GAME_PATH}/>
                        </CheckAuth>} 
                    />
                    <Route path={GAMES_LIST_PATH} element={
                        <CheckAuth>
                            <CheckIsAdmin>
                                <Path path={GAMES_LIST_PATH} />
                            </CheckIsAdmin>
                        </CheckAuth>} 
                    />
                    <Route path={UPDATE_GAME_PATH}>
                        <Route path=":name" element={
                            <CheckAuth>
                                <CheckIsAdmin>
                                    <Path path={UPDATE_GAME_PATH} />
                                </CheckIsAdmin>
                            </CheckAuth>} 
                        />
                    </Route>
                    <Route path={UPDATE_SKILL_PATH}>
                        <Route path=":name" element={
                            <CheckAuth>
                                <CheckIsAdmin>
                                    <Path path={UPDATE_SKILL_PATH} />
                                </CheckIsAdmin>
                            </CheckAuth>
                        } />
                    </Route>
                    <Route path={UPDATE_USER_PATH} element={
                        <CheckAuth>
                            <CheckIsAdmin>
                                <Path path={UPDATE_USER_PATH} />
                            </CheckIsAdmin>
                        </CheckAuth>
                    } />
                    <Route path={ADMIN_PANEL_PATH} element={
                        <CheckAuth>
                            <CheckIsAdmin>
                                <Path path={ADMIN_PANEL_PATH} />
                            </CheckIsAdmin>
                        </CheckAuth>}
                    />
                    <Route path="*" element={<DefaultAppRouterPage />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}
