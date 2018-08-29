import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import MessageComponent from '../../app/containers/message/Message';
import StoriesSeparator from './StoriesSeparator';
import messagesStatus from '../../app/constants/messagesStatus';
import MessageSeparator from '../../app/views/RoomView/Separator';

const styles = StyleSheet.create({
	separator: {
		transform: [{ scaleY: -1 }],
		marginBottom: 30,
		marginTop: 0
	}
});

const loggedUser = {
	id: 'y8bd77ptZswPj3EW8',
	username: 'diego.mello',
	token: '79q6lH40W4ZRGLOshDiDiVlQaCc4f_lU9HNdHLAzuHz'
};

const baseUrl = 'https://open.rocket.chat';
const customEmojis = { react_rocket: 'png', nyan_rocket: 'png', marioparty: 'gif' };

const Message = props => (
	<MessageComponent
		baseUrl={baseUrl}
		customEmojis={customEmojis}
		loggedUser={loggedUser}
		username='diego.mello'
		ts={new Date()}
		timeFormat='LT'
		header
		{...props}
	/>
);

// eslint-disable-next-line react/prop-types
const Separator = ({ title }) => <StoriesSeparator title={title} style={styles.separator} />;

export default (
	<ScrollView style={{ flex: 1, transform: [{ scaleY: -1 }] }} contentContainerStyle={{ marginVertical: 30 }}>

		<Message msg='Message' />
		<Separator title='Simple' />

		<Message msg='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' />
		<Separator title='Long message' />

		<Message msg='This is the second message' header={false} />
		<Message msg='This is the first message' />
		<Separator title='Grouped messages' />

		<Message msg='Message' header={false} />
		<Separator title='Without header' />

		<Message msg='Message' alias='Diego Mello' />
		<Separator title='With alias' />

		<Message msg='Message' editedBy='diego.mello' />
		<Separator title='Edited' />

		<Message msg='Message' editedBy='rocket.cat' />
		<Separator title='Edited by a different user' />

		<Message
			msg='Message'
			avatar='https://pbs.twimg.com/profile_images/826381429831585793/ixRQBLU4_400x400.jpg'
		/>
		<Separator title='Static avatar' />

		<Message msg='@rocket.cat @diego.mello @all @here #general' />
		<Separator title='Mentions' />

		<Message msg='👊🤙👏' />
		<Separator title='Emojis' />

		<Message msg=':react_rocket: :nyan_rocket: :marioparty:' />
		<Separator title='Custom Emojis' />

		<Message msg='Testing' timeFormat='DD MMMM YYYY' />
		<Separator title='Time format' />

		<Message
			msg='Reactions'
			reactions={[{
				emoji: ':joy:',
				usernames: [{ value: 'username' }, { value: 'rocket.cat' }, { value: 'diego.mello' }]
			}, {
				emoji: ':marioparty:',
				usernames: [{ value: 'username' }, { value: 'rocket.cat' }, { value: 'diego.mello' }, { value: 'user1' }, { value: 'user1' }, { value: 'user1' }, { value: 'user1' }, { value: 'user1' }, { value: 'user1' }, { value: 'user1' }, { value: 'user1' }, { value: 'user1' }, { value: 'user1' }]
			}, {
				emoji: ':thinking:',
				usernames: [{ value: 'username' }]
			}]}
			onReactionPress={() => {}}
		/>
		<Separator title='Reactions' />

		<Message
			msg='Multiple Reactions'
			reactions={[{
				emoji: ':marioparty:',
				usernames: [{ value: 'username' }]
			}, {
				emoji: ':react_rocket:',
				usernames: [{ value: 'username' }]
			}, {
				emoji: ':nyan_rocket:',
				usernames: [{ value: 'username' }]
			}, {
				emoji: ':heart:',
				usernames: [{ value: 'username' }]
			}, {
				emoji: ':dog:',
				usernames: [{ value: 'username' }]
			}, {
				emoji: ':grinning:',
				usernames: [{ value: 'username' }]
			}, {
				emoji: ':grimacing:',
				usernames: [{ value: 'username' }]
			}, {
				emoji: ':grin:',
				usernames: [{ value: 'username' }]
			}]}
			onReactionPress={() => {}}
		/>
		<Separator title='Multiple reactions' />

		<Message
			msg='Fourth message'
			username='rocket.cat'
			ts={new Date()}
			header
			timeFormat='LT'
		/>
		<Message msg='Third message' />
		<Message
			msg='Second message'
			username='rocket.cat'
			ts={new Date()}
			header
			timeFormat='LT'
		/>
		<Message msg='First message' />
		<Separator title='Intercalated users' />

		<Message
			msg='Fourth message'
			username='rocket.cat'
			ts={new Date()}
			header
			timeFormat='LT'
		/>
		<MessageSeparator ts={new Date()} unread />
		<Message msg='Third message' />
		<MessageSeparator unread />
		<Message
			msg='Second message'
			username='rocket.cat'
			ts={new Date()}
			header
			timeFormat='LT'
		/>
		<MessageSeparator ts={new Date()} />
		<Message msg='First message' />
		<Separator title='Date and Unread separators' />

		<Message
			attachments={[{
				title: 'This is a title',
				description: 'This is a description',
				image_url: '/file-upload/sxLXBzjwuqxMnebyP/Clipboard%20-%2029%20de%20Agosto%20de%202018%20%C3%A0s%2018:10'
			}]}
		/>
		<Separator title='With image' />

		<Message
			attachments={[{
				title: 'This is a title',
				description: 'This is a description',
				video_url: '/file-upload/cqnKqb6kdajky5Rxj/WhatsApp%20Video%202018-08-22%20at%2019.09.55.mp4'
			}]}
		/>
		<Separator title='With video' />

		{/* <Message
			attachments={[{
				title: 'This is a title',
				description: 'This is a description',
				audio_url: '/file-upload/c4wcNhrbXJLBvAJtN/1535569819516.aac'
			}]}
		/>
		<Separator title='With audio' /> */}

		<Message
			urls={[{
				url: 'https://rocket.chat',
				image: 'https://rocket.chat/images/blog/post.jpg',
				title: 'Rocket.Chat - Free, Open Source, Enterprise Team Chat',
				description: 'Rocket.Chat is the leading open source team chat software solution. Free, unlimited and completely customizable with on-premises and SaaS cloud hosting.'
			}, {
				url: 'https://google.com',
				title: 'Google',
				description: 'Search the world\'s information, including webpages, images, videos and more. Google has many special features to help you find exactly what you\'re looking for.'
			}]}
		/>
		<Separator title='URL' />

		<Message
			msg='This is a reply'
			attachments={[{
				author_name: 'rocket.cat',
				ts: new Date(),
				timeFormat: 'LT',
				text: 'First message'
			}]}
		/>
		<Separator title='Reply' />

		<Message
			msg='Third message'
			attachments={[{
				author_name: 'rocket.cat',
				ts: new Date(),
				timeFormat: 'LT',
				text: 'Second message',
				attachments: [{
					author_name: 'rocket.cat',
					ts: new Date(),
					timeFormat: 'LT',
					text: 'First message'
				}]
			}]}
		/>
		<Separator title='Nested Replies' />

		<Message
			msg='Message'
			attachments={[{
				author_name: 'rocket.cat',
				ts: new Date(),
				timeFormat: 'LT',
				text: 'Custom fields',
				fields: [{
					title: 'Field 1',
					value: 'Value 1'
				}, {
					title: 'Field 2',
					value: 'Value 2'
				}, {
					title: 'Field 3',
					value: 'Value 3'
				}, {
					title: 'Field 4',
					value: 'Value 4'
				}, {
					title: 'Field 5',
					value: 'Value 5'
				}]
			}]}
		/>
		<Separator title='Custom fields' />

		<Message msg='Broadcasted message' broadcast />
		<Separator title='Broadcast' />

		<Message msg='This message is inside an archived room' archived />
		<Separator title='Archived' />

		<Message msg='This message has error' status={messagesStatus.ERROR} />
		<Separator title='Error' />

		<Message msg='Temp message' status={messagesStatus.TEMP} />
		<Separator title='Temp' />

		<Message msg='Message being edited' editing />
		<Separator title='Editing' />

		<Message type='rm' />
		<Separator title='Removed' />

		<Message type='uj' />
		<Separator title='Joined' />

		<Message msg='New name' type='r' />
		<Separator title='Room name changed' />

		<Message
			msg='New name'
			type='message_pinned'
			attachments={[{
				author_name: 'rocket.cat',
				ts: new Date(),
				timeFormat: 'LT',
				text: 'First message'
			}]}
		/>
		<Separator title='Message pinned' />

		<Message type='ul' />
		<Separator title='Has left the channel' />

		<Message msg='rocket.cat' type='ru' />
		<Separator title='User removed' />

		<Message msg='rocket.cat' type='au' />
		<Separator title='User added' />

		<Message msg='rocket.cat' type='user-muted' />
		<Separator title='User muted' />

		<Message msg='rocket.cat' type='user-unmuted' />
		<Separator title='User unmuted' />

		<Message
			msg='rocket.cat'
			role='admin' // eslint-disable-line
			type='subscription-role-added'
		/>
		<Separator title='Role added' />

		<Message
			msg='rocket.cat'
			role='admin' // eslint-disable-line
			type='subscription-role-removed'
		/>
		<Separator title='Role removed' />

		<Message msg='new description' type='room_changed_description' />
		<Separator title='Changed description' />

		<Message msg='new announcement' type='room_changed_announcement' />
		<Separator title='Changed announcement' />

		<Message msg='new topic' type='room_changed_topic' />
		<Separator title='Changed topic' />

		<Message msg='public' type='room_changed_privacy' />
		<Separator title='Changed type' />

		<Message msg='Message' style={[styles.normalize, { backgroundColor: '#ddd' }]} />
		<Separator title='Custom style' />

		<Message msg='Italic with *asterisks* or _underscores_. Bold with **asterisks** or __underscores__. ~~Strikethrough~~' />
		<Separator title='Markdown emphasis' />

		<Message
			msg='# H1
## H2
### H3
#### H4
##### H5
###### H6'
		/>
		<Separator title='Markdown headers' />

		<Message msg='Support <http://google.com|Google> [I`m an inline-style link](https://www.google.com) https://google.com' />
		<Separator title='Markdown links' />

		<Message msg='![alt text](https://play.google.com/intl/en_us/badges/images/badge_new.png)' />
		<Separator title='Markdown image' />

		<Message
			msg='Inline `code` has `back-ticks around` it.
```
Code block
```'
		/>
		<Separator title='Markdown code' />

		<Message msg='> Quote' />
		<Separator title='Markdown quote' />

		<Message
			msg='First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column'
		/>
		<Separator title='Markdown table' />
	</ScrollView>
);
