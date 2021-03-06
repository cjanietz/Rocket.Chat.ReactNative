const {
	device, expect, element, by, waitFor
} = require('detox');
const { takeScreenshot } = require('./helpers/screenshot');
const data = require('./data');
const { tapBack, sleep } = require('./helpers/app');

describe('Create room screen', () => {
	before(async() => {
		await sleep(5000);
		await waitFor(element(by.id('rooms-list-view'))).toBeVisible().withTimeout(2000);
		await device.reloadReactNative();
		await element(by.id('rooms-list-view-create-channel')).tap();
		await waitFor(element(by.id('new-message-view'))).toBeVisible().withTimeout(2000);
	});

	describe('New Message', async() => {
		describe('Render', async() => {
			it('should have new message screen', async() => {
				await expect(element(by.id('new-message-view'))).toBeVisible();
			});
	
			it('should have search input', async() => {
				await waitFor(element(by.id('new-message-view-search'))).toExist().withTimeout(2000);
				await expect(element(by.id('new-message-view-search'))).toExist();
			});
	
			after(async() => {
				takeScreenshot();
			});
		})

		describe('Usage', async() => {
			it('should back to rooms list', async() => {
				await tapBack();
				await waitFor(element(by.id('rooms-list-view'))).toBeVisible().withTimeout(2000);
				await expect(element(by.id('rooms-list-view'))).toBeVisible();
				await element(by.id('rooms-list-view-create-channel')).tap();
				await waitFor(element(by.id('new-message-view'))).toBeVisible().withTimeout(2000);
			});

			it('should search user and navigate', async() => {
				await element(by.id('new-message-view-search')).replaceText('rocket.cat');
				await waitFor(element(by.id('new-message-view-item-rocket.cat'))).toBeVisible().withTimeout(60000);
				await expect(element(by.id('new-message-view-item-rocket.cat'))).toBeVisible();
				await element(by.id('new-message-view-item-rocket.cat')).tap();
				await waitFor(element(by.id('room-view'))).toBeVisible().withTimeout(10000);
				await expect(element(by.id('room-view'))).toBeVisible();
				await waitFor(element(by.text('rocket.cat'))).toBeVisible().withTimeout(60000);
				await expect(element(by.text('rocket.cat'))).toBeVisible();
				await tapBack(2);
				await waitFor(element(by.id('rooms-list-view'))).toBeVisible().withTimeout(2000);
				await element(by.id('rooms-list-view-create-channel')).tap();
			});

			it('should navigate to select users', async() => {
				await element(by.id('new-message-view-create-channel')).tap();
				await waitFor(element(by.id('select-users-view'))).toBeVisible().withTimeout(2000);
				await expect(element(by.id('select-users-view'))).toBeVisible();
			});


			after(async() => {
				takeScreenshot();
			});
		})
	});

	describe('Select Users', async() => {
		it('should search users', async() => {
			await element(by.id('select-users-view-search')).replaceText('rocket.cat');
			await waitFor(element(by.id(`select-users-view-item-rocket.cat`))).toBeVisible().withTimeout(10000);
			await expect(element(by.id(`select-users-view-item-rocket.cat`))).toBeVisible();
		});

		it('should select/unselect user', async() => {
			await element(by.id('select-users-view-item-rocket.cat')).tap();
			await waitFor(element(by.id('selected-user-rocket.cat'))).toBeVisible().withTimeout(5000);
			await expect(element(by.id('selected-user-rocket.cat'))).toBeVisible();
			await expect(element(by.id('selected-users-view-submit'))).toBeVisible();
			await element(by.id('selected-user-rocket.cat')).tap();
			await waitFor(element(by.id('selected-user-rocket.cat'))).toBeNotVisible().withTimeout(5000);
			await expect(element(by.id('selected-user-rocket.cat'))).toBeNotVisible();
			await expect(element(by.id('selected-users-view-submit'))).toBeNotVisible();
			await element(by.id('select-users-view-item-rocket.cat')).tap();
			await waitFor(element(by.id('selected-user-rocket.cat'))).toBeVisible().withTimeout(5000);
		});

		it('should navigate to create channel view', async() => {
			await element(by.id('selected-users-view-submit')).tap();
			await waitFor(element(by.id('create-channel-view'))).toBeVisible().withTimeout(5000);
			await expect(element(by.id('create-channel-view'))).toBeVisible();
		});
	})

	describe('Create Channel', async() => {
		describe('Render', async() => {
			it('should render all fields', async() => {
				await expect(element(by.id('create-channel-name'))).toBeVisible();
				await expect(element(by.id('create-channel-type'))).toBeVisible();
				await expect(element(by.id('create-channel-readonly'))).toBeVisible();
				await expect(element(by.id('create-channel-broadcast'))).toExist();
			})
		})

		describe('Usage', async() => {
			it('should get invalid room', async() => {
				await element(by.id('create-channel-name')).replaceText('general');
				await element(by.id('create-channel-submit')).tap();
				await waitFor(element(by.text(`A channel with name 'general' exists`))).toBeVisible().withTimeout(60000);
				await expect(element(by.text(`A channel with name 'general' exists`))).toBeVisible();
				await element(by.text('OK')).tap();
			});
	
			it('should create public room', async() => {
				await element(by.id('create-channel-name')).replaceText(`public${ data.random }`);
				await element(by.id('create-channel-type')).tap();
				await element(by.id('create-channel-submit')).tap();
				await waitFor(element(by.id('room-view'))).toBeVisible().withTimeout(60000);
				await expect(element(by.id('room-view'))).toBeVisible();
				await waitFor(element(by.text(`public${ data.random }`))).toBeVisible().withTimeout(60000);
				await expect(element(by.text(`public${ data.random }`))).toBeVisible();
				await tapBack(2);
				await waitFor(element(by.id('rooms-list-view'))).toBeVisible().withTimeout(2000);
				await waitFor(element(by.id(`rooms-list-view-item-public${ data.random }`))).toBeVisible().withTimeout(60000);
				await expect(element(by.id(`rooms-list-view-item-public${ data.random }`))).toBeVisible();
			});
	
			it('should create private room', async() => {
				await waitFor(element(by.id('rooms-list-view'))).toBeVisible().withTimeout(2000);
				await device.reloadReactNative();
				await element(by.id('rooms-list-view-create-channel')).tap();
				await waitFor(element(by.id('new-message-view'))).toBeVisible().withTimeout(2000);
				await element(by.id('new-message-view-create-channel')).tap();
				await waitFor(element(by.id('select-users-view'))).toBeVisible().withTimeout(2000);
				await element(by.id('select-users-view-item-rocket.cat')).tap();
				await waitFor(element(by.id('selected-user-rocket.cat'))).toBeVisible().withTimeout(5000);
				await element(by.id('selected-users-view-submit')).tap();
				await waitFor(element(by.id('create-channel-view'))).toBeVisible().withTimeout(5000);
				await element(by.id('create-channel-name')).replaceText(`private${ data.random }`);
				await element(by.id('create-channel-submit')).tap();
				await waitFor(element(by.id('room-view'))).toBeVisible().withTimeout(60000);
				await expect(element(by.id('room-view'))).toBeVisible();
				await waitFor(element(by.text(`private${ data.random }`))).toBeVisible().withTimeout(60000);
				await expect(element(by.text(`private${ data.random }`))).toBeVisible();
				await tapBack(2);
				await waitFor(element(by.id('rooms-list-view'))).toBeVisible().withTimeout(2000);
				await waitFor(element(by.id(`rooms-list-view-item-private${ data.random }`))).toBeVisible().withTimeout(60000);
				await expect(element(by.id(`rooms-list-view-item-private${ data.random }`))).toBeVisible();
			});
		})

		afterEach(async() => {
			takeScreenshot();
		});
	});
});
