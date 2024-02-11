import { JSONAPIErrorReporter } from "@config/vinejs/errorHandler";
import vine from '@vinejs/vine'

vine.errorReporter = () => new JSONAPIErrorReporter()
