import { ValueObject } from "src/libs/ddd";
import { ArgumentOutOfRangeException } from "src/libs/exceptions";
import { Guard } from "src/libs/guard";

export interface PasswordProps {
    password: string;
}


export class Password extends ValueObject<PasswordProps> {
    get password(): string {
        return this.props.password;
    }

    /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules.
   * You can avoid this type of validation here and validate
   * only on the edge of the application (in controllers when receiving
   * a request) sacrificing some security for performance and convenience.
   */

    /**
     * Validates whether a password meets security requirements.
     */
    protected validate(props: PasswordProps): void {
        if (!Guard.lengthIsBetween(props.password, 8, 100)) {
            throw new ArgumentOutOfRangeException('Password must be between 8 and 100 characters');
        }

        if (!/[A-Z]/.test(props.password)) {
            throw new ArgumentOutOfRangeException('Password must contain at least one uppercase letter (A-Z).');
        }

        if (!/[a-z]/.test(props.password)) {
            throw new ArgumentOutOfRangeException('Password must contain at least one lowercase letter (a-z).');
        }

        if (!/[0-9]/.test(props.password)) {
            throw new ArgumentOutOfRangeException('Password must contain at least one number (0-9).');
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(props.password)) {
            throw new ArgumentOutOfRangeException('Password must contain at least one special character (!@#$%^&*...).');
        }
    }
}