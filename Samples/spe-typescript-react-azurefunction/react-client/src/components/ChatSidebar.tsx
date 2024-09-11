
import React from "react";
import { ChatAuthProvider } from "../providers/ChatAuthProvider";
import { ChatController } from "../providers/ChatController";
import ChatEmbedded, { ChatEmbeddedAPI, ChatLaunchConfig } from '../sdk/ChatEmbedded'

export const ChatSidebar: React.FunctionComponent = () => {
    const [chatAuthProvider, setChatAuthProvider] = React.useState<ChatAuthProvider | undefined>();
    
    const [chatConfig] = React.useState<ChatLaunchConfig>({
        header: ChatController.instance.header,
        theme: ChatController.instance.theme,
        zeroQueryPrompts: ChatController.instance.zeroQueryPrompts,
        suggestedPrompts: ChatController.instance.suggestedPrompts,
        instruction: ChatController.instance.pirateMetaPrompt,
    });

    
    const onApiReady = async (api: ChatEmbeddedAPI) => {
        await api.openChat(chatConfig);
        ChatController.instance.addDataSourceSubscriber(dataSources => {
            api.setDataSources(dataSources);
        });
    }

    ChatAuthProvider.getInstance().then(setChatAuthProvider).catch(console.error);

    return (<>
    {chatAuthProvider && (
        <ChatEmbedded
            authProvider={chatAuthProvider}
            onApiReady={onApiReady}
        />
    )}
    </>);
}























/*
export const HRChat: React.FunctionComponent = () => {
    const [chatAuthProvider, setChatAuthProvider] = React.useState<ChatAuthProvider | undefined>();
    const [chatConfig] = React.useState<ChatLaunchConfig>({
        header: ChatController.instance.header,
        theme: ChatController.instance.theme,
        zeroQueryPrompts: ChatController.instance.zeroQueryPrompts,
        suggestedPrompts: ChatController.instance.suggestedPrompts,
        metaPrompt: ChatController.instance.metaPrompt,
    });

    const onApiReady = (api: ChatEmbeddedApi) => {
        ChatController.instance.addDataSourceSubscriber(dataSources => {
            api.dataSources = dataSources;
        });
    };

    ChatAuthProvider.getInstance().then(setChatAuthProvider).catch(console.error);
    return (<>
    {chatAuthProvider && (
        <ChatEmbedded
            authProvider={chatAuthProvider}
            config={chatConfig}
            onApiReady={onApiReady}
        />
    )}
    </>);
}
*/