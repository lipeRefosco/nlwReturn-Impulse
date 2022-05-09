
import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { 
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
 
import { styles } from './styles';
import { theme } from '../../theme';

import { api } from '../../libs/api';
import { FeedbackTypes } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { SendFeedbackButton } from '../SendFeedbackButton';

interface FormProps{
    feedbackType: FeedbackTypes;
    onFeedbackSent: () => void;
    onFeedbackRemove: () => void;
}

export function Form({
    feedbackType,
    onFeedbackSent,
    onFeedbackRemove
} : FormProps) {

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string | undefined>(undefined);
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error));
    }

    function handleScreenshotRemove(){
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        
        if(!comment){
            return;
        }

        if(isSendingFeedback){
            return;
        }

        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {
            encoding: 'base64'
        })

        try {

            await api.post('/feedback', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment,
            })

            onFeedbackSent();

        } catch (error) {
            console.log(error)
            setIsSendingFeedback(false);
        }
    }

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackRemove}>
                <ArrowLeft
                    size={24}
                    weight='bold'
                    color={theme.colors.text_secondary}
                /> 
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>

        </View>
        <TextInput
            multiline
            style={styles.input}
            placeholder="Diga o que está acontecendo..."
            placeholderTextColor={theme.colors.text_secondary}
            value={comment}
            onChangeText={setComment}
            autoCorrect={false}
        />
        <View style={styles.footer}>
            <ScreenshotButton
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}
            />
            <SendFeedbackButton
                onPress={handleSendFeedback}
                isLoading={isSendingFeedback}
            />
        </View>
    </View>
  );
}