import { mount } from 'lithent';

const LoadingText = mount(() => {
  return () => (
    <div
      class="flex justify-center items-center"
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <span class="relative before:content-[var(--dots)] animate-dots" />
    </div>
  );
});

export default LoadingText;
