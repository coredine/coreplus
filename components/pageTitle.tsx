import { Component, ReactNode } from "react";
import { DimensionValue, Text, View } from "react-native";

export interface PageTitleProperties {
    title: string;
    height?: DimensionValue;
}

export class PageTitle extends Component<PageTitleProperties, any, any> {
    constructor(properties: PageTitleProperties) {
        super(properties);
    }

    render(): ReactNode {
        return(
            <View className="bg-blue-500" style={{height: this.props.height ? this.props.height : "8%"}}>
                <Text className="m-auto font-extrabold text-4xl">{this.props.title}</Text>
            </View>
        )
    }
}