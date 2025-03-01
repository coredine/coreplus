import { Component, ReactNode } from "react";
import { Text, View } from "react-native";
import { PageTitle } from "../components/pageTitle";

export enum PageState {
    LOGIN,
    SIGNUP
}

export interface LoginSignupPropreties {
    redirect?: String;
    initialPageState?: PageState;
}

export interface LoginSignupStates {
    email: string;
    password: string;
    pageState: PageState;
}

export default class LoginSignup extends Component<LoginSignupPropreties, LoginSignupStates, any> {
    constructor(properties: LoginSignupPropreties) {
        super(properties);
        this.state = {
            email: "",
            password: "",
            pageState: this.props.initialPageState ? this.props.initialPageState : PageState.LOGIN
        }
    }


    render(): ReactNode {
        return(
            <View>
                <PageTitle title={""}/>

            </View>
        )
    }
}