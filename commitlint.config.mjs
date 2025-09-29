/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Loại commit type được phép
    'type-enum': [
      2,
      'always',
      [
        'feat', // Tính năng mới
        'fix', // Sửa lỗi
        'docs', // Tài liệu
        'style', // Formatting (không ảnh hưởng đến logic)
        'refactor', // Refactor code
        'perf', // Cải thiện performance
        'test', // Thêm test
        'build', // Build system hoặc dependencies
        'ci', // CI/CD changes
        'chore', // Tasks khác
        'revert', // Revert commit trước đó
      ],
    ],

    // Subject phải có ít nhất 10 ký tự
    'subject-min-length': [2, 'always', 10],

    // Subject không được dài quá 100 ký tự
    'subject-max-length': [2, 'always', 100],

    // Subject không được kết thúc bằng dấu chấm
    'subject-full-stop': [2, 'never', '.'],

    // Subject phải bắt đầu bằng chữ thường
    'subject-case': [2, 'always', 'lower-case'],

    // Body phải có dòng trống sau type scope
    'body-leading-blank': [2, 'always'],

    // Footer phải có dòng trống trước và sau
    'footer-leading-blank': [2, 'always'],

    // Header phải có định dạng đúng
    'header-max-length': [2, 'always', 100],
  },

  // Tùy chỉnh transformer
  transform: {
    type: 'lowerCase',
  },

  // Ignore patterns (skip commit lint cho các pattern này)
  ignores: [
    // Bỏ qua merge commits
    commit => commit.includes('Merge'),

    // Bỏ qua commit từ dependabot
    commit => commit.includes('dependabot'),

    // Bỏ qua commit WIP (work in progress)
    commit => commit.toLowerCase().includes('wip'),
  ],
};
