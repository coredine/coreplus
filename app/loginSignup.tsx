import { Component, ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PageTitle } from "../components/pageTitle";

export enum PageState {
    LOGIN,
    SIGNUP
}

export interface LoginSignupPropreties {
    initialPageState?: PageState;
    onSuccessfulSubmit?: () => void;
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
                <PageTitle title={PageState.LOGIN ? "Login" : "Signup"}/>

                {/* FORM VIEW */}
                <View>
                    {/* FORM FIELDS */}
                    <View>

                    </View>

                    {/* FORM BUTTONS */}
                    <View>

                    </View>
                </View>

                {/* OTHER BUTTONS (switch to signup) */}
                <View>

                </View>

            </View>
        )
    }
}