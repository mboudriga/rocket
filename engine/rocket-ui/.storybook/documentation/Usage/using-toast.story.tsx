import { Docs } from '../../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Using_Toast = () => (
  <Docs.Template title="Using Toast">
    <Docs.Code title="Basic Usage" language="javascript" code={BASIC_USAGE_CODE}>
      Import toast from @rocket/ui and call the method matching the notification type. Each method
      accepts a message string and an optional options object with a description.
    </Docs.Code>

    <Docs.Code title="Toast Options" language="javascript" code={TOAST_OPTIONS_CODE}>
      Customize toast behavior with options. The toast system is powered by react-toastify under the
      hood.
    </Docs.Code>

    <Docs.Code title="Provider Configuration" language="javascript" code={PROVIDER_CONFIG_CODE}>
      RocketProvider includes a ToastProvider by default. Pass toast props to customize the defaults,
      or set toast to false to disable the toast system entirely.
    </Docs.Code>
  </Docs.Template>
);

export default {
  title: 'Documentation/Usage/Using Toast',
  component: Using_Toast,
};

const BASIC_USAGE_CODE = `import { toast } from '@rocket/ui';

// Success notification
toast.success('Changes saved!', {
  description: 'Your settings have been updated.',
});

// Error notification
toast.error('Something went wrong', {
  description: 'Please try again later.',
});

// Warning notification
toast.warning('Unsaved changes', {
  description: 'You have unsaved changes that will be lost.',
});

// Info notification
toast.info('New version available', {
  description: 'Refresh the page to update.',
});

// Loading notification
toast.loading('Saving...', {
  description: 'Please wait while we save your changes.',
});`;

const TOAST_OPTIONS_CODE = `import { toast } from '@rocket/ui';

// Auto-close after 5 seconds (default)
toast.success('Saved!');

// Custom auto-close duration (in milliseconds)
toast.success('Saved!', { autoClose: 3000 });

// Prevent auto-close (user must dismiss)
toast.success('Saved!', { autoClose: false });

// Custom position
toast.success('Saved!', { position: 'bottom-right' });

// Available positions:
// 'top-left', 'top-center', 'top-right'
// 'bottom-left', 'bottom-center', 'bottom-right'`;

const PROVIDER_CONFIG_CODE = `import { RocketProvider } from '@rocket/ui';

// Default setup — toasts enabled with default settings
<RocketProvider>
  <App />
</RocketProvider>

// Custom toast settings
<RocketProvider toast={{ position: 'bottom-right', autoClose: 3000 }}>
  <App />
</RocketProvider>

// Disable toasts entirely
<RocketProvider toast={false}>
  <App />
</RocketProvider>`;
