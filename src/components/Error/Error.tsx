import { Alert } from "antd";
import css from "./Error.module.css";

const ErrorMessage = () => {
    return (
        <div className={css.error_message}>
            <Alert
                title="Houston, we have a problem."
                description="The server went on a coffee break. Give it a second to wake up."
                type="error"
                showIcon
            />
        </div>
    );
};

export default ErrorMessage;