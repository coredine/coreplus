import { Component, ReactNode, RefObject } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PageTitle } from "../components/pageTitle";
import { verify, regexCode } from "../service/RegexService";
import { FormInput } from "../components/formInput";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
    emailIsValid: boolean | undefined;
    passwordIsValid: boolean | undefined;
    pageState: PageState;
    canProceed: boolean;
}

export default class LoginSignup extends Component<LoginSignupPropreties, LoginSignupStates, any> {
    constructor(properties: LoginSignupPropreties) {
        super(properties);
        this.state = {
            email: "",
            password: "",
            emailIsValid: undefined,
            passwordIsValid: undefined,
            pageState: this.props.initialPageState ? this.props.initialPageState : PageState.LOGIN,
            canProceed: false
        }
    }

    componentDidUpdate(prevProps: Readonly<LoginSignupPropreties>, prevState: Readonly<LoginSignupStates>, snapshot?: any): void {
        console.log(this.state.email);
        console.log(this.state.emailIsValid);
    }

    private isLogin = (): boolean => {
        return this.state.pageState == PageState.LOGIN;
    }

    private switchState = (): void => {
        if (this.state.pageState == PageState.LOGIN) this.setState({pageState: PageState.SIGNUP});
        else this.setState({pageState: PageState.LOGIN});
        this.reset();
    }

    private reset = (): void => {
        this.setState((prevState) => { return {...prevState, email: "", password: "", emailIsValid: undefined, canProceed: false, passwordIsValid: undefined}});
    }

    private updateProceedState = (): void => {
        if (this.state.emailIsValid && this.state.passwordIsValid) this.setState((prevState: Readonly<LoginSignupStates>) => {return {...prevState, canProceed: true}});
        else this.setState((prevState: Readonly<LoginSignupStates>) => {return {...prevState, canProceed: false}});
    }

    private updateState = (fieldName: string, value: string | boolean | undefined) => {
        this.setState((prevState: Readonly<LoginSignupStates>) => {
            return {
                ...prevState,
                [fieldName]: value
            }
        });
        this.updateProceedState();
    }
    
    private submit = async () => {
        try {
            if (this.state.emailIsValid && this.state.passwordIsValid) {
                switch (this.state.pageState) {
                    case PageState.LOGIN:
                        console.log("LOGIN..........")
                        break;
                    case PageState.SIGNUP:
                        console.log("SIGNUP..........")
                        break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    render(): ReactNode {
        return(
            <View className="w-full h-full">
                <View className="h-[10vh]">
                    <Text className="text-5xl font-semibold mt-auto mb-auto ml-[3vw]">{this.isLogin() ? "Login" : "Signup"}</Text>
                </View>

                <View className="h-auto min-h-[30vh]">
                    <View className="mt-auto mb-auto">
                        <FormInput label="Email" 
                        onChangeText={(value: string) => this.updateState("email", value)} 
                        icon={faEnvelope} 
                        regex={regexCode.EMAIL}
                        validationCallback={(isValid: boolean) => this.updateState("emailIsValid", isValid)}
                        errorMessage="Wrong format! (...@....com)"
                        inputValue={this.state.email}
                        isValid={this.state.emailIsValid}/>

                        <FormInput 
                        label="Password" 
                        onChangeText={(value: string) => this.updateState("password", value)} 
                        icon={faLock} 
                        regex={regexCode.PWD} 
                        hidden={true}
                        validationCallback={(isValid: boolean) => this.updateState("passwordIsValid", isValid)}
                        errorMessage="Wrong format! (Aa1_)"
                        inputValue={this.state.password}
                        isValid={this.state.passwordIsValid}/>

                        <View className="flex-row-reverse min-h-[5vh]">
                                {this.isLogin() ? 
                                    <TouchableOpacity className="mr-[3vw]">
                                        <Text className="text-blue-700">Forgot Password</Text>
                                    </TouchableOpacity> 
                                : 
                                null
                                }
                        </View> 

                    </View>
                </View>

                <View className="h-auto mt-[8vh]">
                    <View className="h-auto">
                        <TouchableOpacity className="border-2 w-[90vw] h-[7vh] rounded-xl m-auto border-blue-700 bg-blue-500" onPress={this.submit} style={{opacity: this.state.canProceed ? 1 : 0.30}}>
                            <Text className="m-auto text-2xl">Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-auto ml-auto mt-2 w-auto" onPress={this.switchState}>
                            <Text className="text-lg text-blue-700">{this.state.pageState == PageState.LOGIN ? "Register now" : "Already have an account?"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        )
    }
}