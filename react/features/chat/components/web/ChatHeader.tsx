import React, { useCallback } from 'react';
import { WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { translate } from '../../../base/i18n/functions';
import Icon from '../../../base/icons/components/Icon';
import { IconCloseLarge } from '../../../base/icons/svg';
import { toggleChat } from '../../actions.web';

interface IProps extends WithTranslation {

    /**
     * An optional class name.
     */
    className: string;

    /**
     * Optional id.
     */
    id?: string;

    /**
     * Whether the polls feature is enabled or not.
     */
    isPollsEnabled: boolean;

    /**
     * Function to be called when pressing the close button.
     */
    onCancel: Function;
}

/**
 * Custom header of the {@code ChatDialog}.
 *
 * @returns {React$Element<any>}
 */
function Header({ onCancel, className, isPollsEnabled, t }: IProps) {

    const onKeyPressHandler = useCallback(e => {
        if (onCancel && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            onCancel();
        }
    }, [ onCancel ]);

    return (
        <div
            className = { className || 'chat-dialog-header' }
            role = 'heading'>
            { t(isPollsEnabled ? 'chat.titleWithPolls' : 'chat.title') }
            <Icon
                ariaLabel = { t('toolbar.closeChat') }
                onClick = { onCancel }
                onKeyPress = { onKeyPressHandler }
                role = 'button'
                src = { IconCloseLarge }
                tabIndex = { 0 } />
        </div>
    );
}

const mapDispatchToProps = { onCancel: toggleChat };

export default translate(connect(null, mapDispatchToProps)(Header));
