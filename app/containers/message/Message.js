import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ViewPropTypes, Image as ImageRN } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { KeyboardUtils } from 'react-native-keyboard-input';

import Image from './Image';
import User from './User';
import Avatar from '../Avatar';
import Audio from './Audio';
import Video from './Video';
import Markdown from './Markdown';
import Url from './Url';
import Reply from './Reply';
import ReactionsModal from './ReactionsModal';
import Emoji from './Emoji';
import styles from './styles';
import Touch from '../../utils/touch';
import I18n from '../../i18n';
import messagesStatus from '../../constants/messagesStatus';

const SYSTEM_MESSAGES = [
	'r',
	'au',
	'ru',
	'ul',
	'uj',
	'rm',
	'user-muted',
	'user-unmuted',
	'message_pinned',
	'subscription-role-added',
	'subscription-role-removed',
	'room_changed_description',
	'room_changed_announcement',
	'room_changed_topic',
	'room_changed_privacy'
];

const getInfoMessage = ({
	type, role, msg, username
}) => {
	if (type === 'rm') {
		return I18n.t('Message_removed');
	} else if (type === 'uj') {
		return I18n.t('Has_joined_the_channel');
	} else if (type === 'r') {
		return I18n.t('Room_name_changed', { name: msg, userBy: username });
	} else if (type === 'message_pinned') {
		return I18n.t('Message_pinned');
	} else if (type === 'ul') {
		return I18n.t('Has_left_the_channel');
	} else if (type === 'ru') {
		return I18n.t('User_removed_by', { userRemoved: msg, userBy: username });
	} else if (type === 'au') {
		return I18n.t('User_added_by', { userAdded: msg, userBy: username });
	} else if (type === 'user-muted') {
		return I18n.t('User_muted_by', { userMuted: msg, userBy: username });
	} else if (type === 'user-unmuted') {
		return I18n.t('User_unmuted_by', { userUnmuted: msg, userBy: username });
	} else if (type === 'subscription-role-added') {
		return `${ msg } was set ${ role } by ${ username }`;
	} else if (type === 'subscription-role-removed') {
		return `${ msg } is no longer ${ role } by ${ username }`;
	} else if (type === 'room_changed_description') {
		return I18n.t('Room_changed_description', { description: msg, userBy: username });
	} else if (type === 'room_changed_announcement') {
		return I18n.t('Room_changed_announcement', { announcement: msg, userBy: username });
	} else if (type === 'room_changed_topic') {
		return I18n.t('Room_changed_topic', { topic: msg, userBy: username });
	} else if (type === 'room_changed_privacy') {
		return I18n.t('Room_changed_privacy', { type: msg, userBy: username });
	}
	return '';
};

export default class Message extends PureComponent {
	static propTypes = {
		status: PropTypes.any,
		reactions: PropTypes.any,
		loggedUser: PropTypes.shape({
			id: PropTypes.string.isRequired,
			username: PropTypes.string.isRequired,
			token: PropTypes.string.isRequired
		}),
		editing: PropTypes.bool,
		toggleReactionPicker: PropTypes.func,
		replyBroadcast: PropTypes.func,
		onReactionPress: PropTypes.func,
		style: ViewPropTypes.style,
		onLongPress: PropTypes.func,
		archived: PropTypes.bool,
		broadcast: PropTypes.bool,
		reactionsModal: PropTypes.bool,
		type: PropTypes.string,
		userId: PropTypes.string,
		header: PropTypes.bool,
		username: PropTypes.string,
		avatar: PropTypes.string,
		alias: PropTypes.string,
		ts: PropTypes.instanceOf(Date),
		editedBy: PropTypes.string,
		timeFormat: PropTypes.string.isRequired,
		attachments: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		]),
		urls: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		]),
		msg: PropTypes.string,
		onReactionLongPress: PropTypes.func,
		onClose: PropTypes.func,
		baseUrl: PropTypes.string.isRequired,
		customEmojis: PropTypes.object.isRequired
	}

	static defaultProps = {
		onLongPress: () => {},
		archived: false,
		broadcast: false,
		attachments: [],
		urls: [],
		reactions: []
	}

	onPress = () => {
		KeyboardUtils.dismiss();
	}

	isInfoMessage() {
		return SYSTEM_MESSAGES.includes(this.props.type);
	}

	isOwn = () => this.props.userId === this.props.loggedUser.id;

	isDeleted() {
		return this.props.type === 'rm';
	}

	isTemp() {
		return this.props.status === messagesStatus.TEMP || this.props.status === messagesStatus.ERROR;
	}

	hasError() {
		return this.props.status === messagesStatus.ERROR;
	}

	renderAvatar = () => {
		const {
			header, avatar, username, baseUrl
		} = this.props;
		if (header) {
			return (
				<Avatar
					style={styles.avatar}
					text={avatar ? '' : username}
					size={36}
					borderRadius={4}
					avatar={avatar}
					baseUrl={baseUrl}
				/>
			);
		}
		return null;
	}

	renderUsername = () => {
		const {
			header, timeFormat, username, alias, ts, editedBy, baseUrl
		} = this.props;
		if (header) {
			return (
				<User
					onPress={this._onPress}
					timeFormat={timeFormat}
					username={username}
					alias={alias}
					ts={ts}
					editedBy={editedBy}
					temp={this.isTemp()}
					baseUrl={baseUrl}
				/>
			);
		}
		return null;
	}

	renderContent() {
		if (this.isInfoMessage()) {
			return <Text style={styles.textInfo}>{getInfoMessage({ ...this.props })}</Text>;
		}
		const {
			customEmojis, msg, baseUrl, loggedUser
		} = this.props;
		return <Markdown msg={msg} customEmojis={customEmojis} baseUrl={baseUrl} username={loggedUser.username} />;
	}

	renderAttachment() {
		const { attachments, timeFormat } = this.props;

		if (attachments.length === 0) {
			return null;
		}

		return attachments.map((file, index) => {
			const { loggedUser, baseUrl, customEmojis } = this.props;
			if (file.image_url) {
				return <Image key={file.image_url} file={file} user={loggedUser} baseUrl={baseUrl} customEmojis={customEmojis} />;
			}
			if (file.audio_url) {
				return <Audio key={file.audio_url} file={file} user={loggedUser} baseUrl={baseUrl} customEmojis={customEmojis} />;
			}
			if (file.video_url) {
				return <Video key={file.video_url} file={file} user={loggedUser} baseUrl={baseUrl} customEmojis={customEmojis} />;
			}

			// eslint-disable-next-line react/no-array-index-key
			return <Reply key={index} attachment={file} timeFormat={timeFormat} user={loggedUser} baseUrl={baseUrl} customEmojis={customEmojis} />;
		});
	}

	renderUrl = () => {
		const { urls } = this.props;
		if (urls.length === 0) {
			return null;
		}

		return urls.map(url => (
			<Url url={url} key={url.url} />
		));
	}

	renderError = () => {
		if (!this.hasError()) {
			return null;
		}
		return (
			<TouchableOpacity onPress={this.onErrorPress}>
				<Icon name='error-outline' color='red' size={20} style={styles.errorIcon} />
			</TouchableOpacity>
		);
	}

	renderReaction = (reaction) => {
		const reacted = reaction.usernames.findIndex(item => item.value === this.props.loggedUser.username) !== -1;
		const reactedContainerStyle = reacted && styles.reactedContainer;
		return (
			<TouchableOpacity
				onPress={() => this.props.onReactionPress(reaction.emoji)}
				onLongPress={this.props.onReactionLongPress}
				key={reaction.emoji}
				testID={`message-reaction-${ reaction.emoji }`}
			>
				<View style={[styles.reactionContainer, reactedContainerStyle]}>
					<Emoji
						content={reaction.emoji}
						customEmojis={this.props.customEmojis}
						standardEmojiStyle={styles.reactionEmoji}
						customEmojiStyle={styles.reactionCustomEmoji}
						baseUrl={this.props.baseUrl}
					/>
					<Text style={styles.reactionCount}>{ reaction.usernames.length }</Text>
				</View>
			</TouchableOpacity>
		);
	}

	renderReactions() {
		const { reactions } = this.props;
		if (reactions.length === 0) {
			return null;
		}
		return (
			<View style={styles.reactionsContainer}>
				{reactions.map(this.renderReaction)}
				<TouchableOpacity
					onPress={this.props.toggleReactionPicker}
					key='message-add-reaction'
					testID='message-add-reaction'
					style={styles.reactionContainer}
				>
					<ImageRN source={{ uri: 'add_reaction' }} style={{ width: 17, height: 17 }} />
				</TouchableOpacity>
			</View>
		);
	}

	renderBroadcastReply() {
		if (this.props.broadcast && !this.isOwn()) {
			return (
				<TouchableOpacity
					style={styles.broadcastButton}
					onPress={this.props.replyBroadcast}
				>
					<Text style={styles.broadcastButtonText}>Reply</Text>
				</TouchableOpacity>
			);
		}
		return null;
	}

	render() {
		const {
			editing, style, header, archived, onLongPress, reactionsModal, onClose, msg, ts, reactions, username, loggedUser, timeFormat, customEmojis, baseUrl
		} = this.props;
		const accessibilityLabel = I18n.t('Message_accessibility', { user: username, time: moment(ts).format(timeFormat), message: msg });

		return (
			<Touch
				onPress={this.onPress}
				onLongPress={onLongPress}
				disabled={this.isInfoMessage() || this.hasError() || archived}
				underlayColor='#FFF'
				activeOpacity={0.3}
				accessibilityLabel={accessibilityLabel}
				style={header ? { marginBottom: 30 } : { marginBottom: 20 }}
			>
				<View style={[styles.message, editing && styles.editing, style]}>
					<View style={styles.flex}>
						{this.renderError()}
						{this.renderAvatar()}
						<View style={[styles.messageContent, header && styles.hasHeader, this.isTemp() && styles.temp]}>
							{this.renderUsername()}
							{this.renderContent()}
							{this.renderAttachment()}
							{this.renderUrl()}
							{this.renderReactions()}
							{this.renderBroadcastReply()}
						</View>
					</View>
					{reactionsModal ?
						<ReactionsModal
							isVisible={reactionsModal}
							onClose={onClose}
							reactions={reactions}
							user={loggedUser}
							customEmojis={customEmojis}
							baseUrl={baseUrl}
						/>
						: null
					}
				</View>
			</Touch>
		);
	}
}
