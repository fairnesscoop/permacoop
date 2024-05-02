FROM debian:bookworm-slim AS base-tools

ARG DEBIAN_FRONTEND=noninteractive

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US \
    LC_ALL=en_US.UTF-8

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get autoremove -y && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        less \
        locales \
        make \
        man-db \
        manpages \
        manpages-dev \
        nano \
        sudo \
        unzip \
        wget \
        zip \
        zsh

RUN sed -i -e "s/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/" /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale

RUN --mount=type=bind,target=/devcontainers.zsh-theme,source=devcontainers.zsh-theme \
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended && \
    cp -f /devcontainers.zsh-theme ~/.oh-my-zsh/custom/themes/ && \
    sed -i -E 's/(ZSH_THEME=").+(")/\1devcontainers\2/' ~/.zshrc && \
    chsh -s /bin/zsh

RUN echo 'alias ll="LC_ALL=C.UTF-8 ls -AlFp --group-directories-first"' | tee --append \
        ~/.bash_aliases \
        ~/.zshrc

###################################################################################################

FROM base-tools AS dev-tools

SHELL ["/bin/zsh", "-ic"]

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y --no-install-recommends \
        g++ \
        gcc \
        jq \
        python3 \
        python3-pip \
        python3-venv

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    source ~/.zshrc && \
    nvm install 16 && \
    npm install -g \
        node-gyp

ENTRYPOINT []
CMD []
