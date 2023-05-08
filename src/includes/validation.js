import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  url,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("url", url);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_value", minVal);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          string: `The field ${ctx.field} must be string.`,
          min: `The field ${ctx.field} is must be 30 character long.`,
          max: `The field ${ctx.field} must be 120 character only.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          url: `The field ${ctx.field} is not valid`,
          tos: `You must accept the terms of service.`,
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      },
    });
  },
};
