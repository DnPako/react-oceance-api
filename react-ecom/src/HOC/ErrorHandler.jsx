import * as React from 'react';

import ReactNotification from 'react-notifications-component';
import "react-notifications-component/dist/theme.css";

const ErrorHandler = (WrappedComponent) => {
    return class extends React.Component {
        notificationRef = React.createRef();

        constructor(props) {
            super(props);
            this.displayNotification = this.displayNotification.bind(this);
        }

        displayNotification() {
            this.notificationRef.current.addNotification({
                message: this.props.error.message,
                type: "danger",
                insert: "bottom",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {duration: 3000},
                dismissable: {click: true}
            });
        }

        render() {
            if (this.props.error !== null)
                this.displayNotification();

            return (
                <>
                    <ReactNotification ref={this.notificationRef}/>
                    <WrappedComponent {...this.props}/>
                </>
            );
        }
    }
};

export default ErrorHandler;